// utils/wasmLoader.ts
interface WasmModule {
  memory: WebAssembly.Memory;
  exports: WebAssembly.Exports;
  instance: WebAssembly.Instance;
}

interface WasmExports {
  [key: string]: any;
  memory?: WebAssembly.Memory;
  malloc?: (size: number) => number;
  free?: (ptr: number) => void;
  process_data?: (dataPtr: number, dataLength: number) => number;
  get_result?: (resultPtr: number) => number;
  init?: () => void;
}

class WasmLoader {
  private wasmModule: WasmModule | null = null;
  private isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  constructor() {
    // Initialize WASM loader
  }

  async loadModule(wasmPath: string = '/wasm/ai_processor.wasm'): Promise<void> {
    // Return existing loading promise if already loading
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    // Return immediately if already loaded
    if (this.isLoaded && this.wasmModule) {
      return Promise.resolve();
    }

    this.loadingPromise = this.doLoadModule(wasmPath);
    return this.loadingPromise;
  }

  private async doLoadModule(wasmPath: string): Promise<void> {
    try {
      // Check if WebAssembly is supported
      if (typeof WebAssembly === 'undefined') {
        throw new Error('WebAssembly is not supported in this environment');
      }

      console.log('Loading WASM module from:', wasmPath);

      // Fetch the WASM file
      const wasmResponse = await fetch(wasmPath);
      if (!wasmResponse.ok) {
        throw new Error(`Failed to fetch WASM file: ${wasmResponse.status} ${wasmResponse.statusText}`);
      }

      const wasmBytes = await wasmResponse.arrayBuffer();

      // Define imports for the WASM module
      const imports = {
        env: {
          memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
          console_log: (ptr: number, len: number) => {
            // Helper function to log from WASM
            const bytes = new Uint8Array(this.wasmModule?.memory.buffer || new ArrayBuffer(0), ptr, len);
            const text = new TextDecoder().decode(bytes);
            console.log('WASM:', text);
          },
          js_random: () => Math.random(),
          js_now: () => Date.now(),
        },
        wasi_snapshot_preview1: {
          // WASI stub functions for compatibility
          fd_close: () => 0,
          fd_read: () => 0,
          fd_seek: () => 0,
          fd_write: () => 0,
          proc_exit: () => {},
          environ_get: () => 0,
          environ_sizes_get: () => 0,
        }
      };

      // Instantiate the WASM module
      const wasmModule = await WebAssembly.instantiate(wasmBytes, imports);
      
      this.wasmModule = {
        memory: imports.env.memory,
        exports: wasmModule.instance.exports,
        instance: wasmModule.instance
      };

      this.isLoaded = true;
      console.log('WASM module loaded successfully');

      // Initialize the module if it has an init function
      const exports = this.wasmModule.exports as WasmExports;
      if (typeof exports.init === 'function') {
        exports.init();
      }

    } catch (error) {
      console.error('Failed to load WASM module:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to load WebAssembly module: ${errorMessage}`);
    }
  }

  isModuleLoaded(): boolean {
    return this.isLoaded && this.wasmModule !== null;
  }

  getExports(): WasmExports | null {
    if (!this.isModuleLoaded() || !this.wasmModule) {
      return null;
    }
    return this.wasmModule.exports as WasmExports;
  }

  // Helper method to allocate memory in WASM
  malloc(size: number): number | null {
    const exports = this.getExports();
    if (!exports || typeof exports.malloc !== 'function') {
      console.warn('malloc function not available in WASM module');
      return null;
    }
    return exports.malloc(size);
  }

  // Helper method to free memory in WASM
  free(ptr: number): void {
    const exports = this.getExports();
    if (exports && typeof exports.free === 'function') {
      exports.free(ptr);
    }
  }

  // Helper method to write data to WASM memory
  writeToMemory(data: Uint8Array, ptr: number): void {
    if (!this.wasmModule || !this.wasmModule.memory) {
      throw new Error('WASM module not loaded or memory not available');
    }

    const memoryArray = new Uint8Array(this.wasmModule.memory.buffer);
    memoryArray.set(data, ptr);
  }

  // Helper method to read data from WASM memory
  readFromMemory(ptr: number, length: number): Uint8Array {
    if (!this.wasmModule || !this.wasmModule.memory) {
      throw new Error('WASM module not loaded or memory not available');
    }

    const memoryArray = new Uint8Array(this.wasmModule.memory.buffer);
    return memoryArray.slice(ptr, ptr + length);
  }

  // Process data using WASM
  async processData(inputData: Uint8Array): Promise<Uint8Array> {
    if (!this.isModuleLoaded()) {
      throw new Error('WASM module not loaded. Call loadModule() first.');
    }

    const exports = this.getExports();
    if (!exports || typeof exports.process_data !== 'function') {
      throw new Error('process_data function not available in WASM module');
    }

    try {
      // Allocate memory for input data
      const inputPtr = this.malloc(inputData.length);
      if (inputPtr === null) {
        throw new Error('Failed to allocate memory for input data');
      }

      // Write input data to WASM memory
      this.writeToMemory(inputData, inputPtr);

      // Call the WASM function
      const resultPtr = exports.process_data(inputPtr, inputData.length);

      // Read the result (assuming the result size is returned or known)
      // In a real implementation, you'd need to get the result size
      const resultSize = 1024; // Example size
      const resultData = this.readFromMemory(resultPtr, resultSize);

      // Clean up allocated memory
      this.free(inputPtr);
      if (typeof exports.free === 'function' && resultPtr !== inputPtr) {
        this.free(resultPtr);
      }

      return resultData;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error processing data with WASM:', errorMessage);
      throw new Error(`WASM processing failed: ${errorMessage}`);
    }
  }

  // AI-specific processing functions
  async processAIModel(modelData: Float32Array): Promise<Float32Array> {
    // Convert Float32Array to Uint8Array for WASM processing
    const inputBytes = new Uint8Array(modelData.buffer);
    
    try {
      const resultBytes = await this.processData(inputBytes);
      
      // Convert result back to Float32Array
      return new Float32Array(resultBytes.buffer);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`AI model processing failed: ${errorMessage}`);
    }
  }

  // Cleanup resources
  dispose(): void {
    this.wasmModule = null;
    this.isLoaded = false;
    this.loadingPromise = null;
  }

  // Get module information
  getModuleInfo(): object {
    if (!this.isModuleLoaded()) {
      return { status: 'Not loaded' };
    }

    const exports = this.getExports();
    return {
      status: 'Loaded',
      memoryPages: this.wasmModule?.memory.buffer.byteLength ? 
        this.wasmModule.memory.buffer.byteLength / (64 * 1024) : 0,
      availableExports: exports ? Object.keys(exports) : []
    };
  }
}

// Singleton instance
let wasmLoaderInstance: WasmLoader | null = null;

export const getWasmLoader = (): WasmLoader => {
  if (!wasmLoaderInstance) {
    wasmLoaderInstance = new WasmLoader();
  }
  return wasmLoaderInstance;
};

// Utility functions
export const loadWasm = async (wasmPath?: string): Promise<void> => {
  const loader = getWasmLoader();
  await loader.loadModule(wasmPath);
};

export const processWithWasm = async (data: Uint8Array): Promise<Uint8Array> => {
  const loader = getWasmLoader();
  return loader.processData(data);
};

export const isWasmSupported = (): boolean => {
  return typeof WebAssembly !== 'undefined' && 
         typeof WebAssembly.instantiate === 'function';
};

export const disposeWasm = (): void => {
  if (wasmLoaderInstance) {
    wasmLoaderInstance.dispose();
    wasmLoaderInstance = null;
  }
};

export default WasmLoader;