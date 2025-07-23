// public/worker/webllm-worker.js
// WebWorker for running WebLLM models

importScripts('https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/lib/webllm.js');

let engine = null;

// Handle messages from main thread
self.onmessage = async function(event) {
  const { type, data } = event.data;
  
  try {
    switch (type) {
      case 'initialize':
        await initializeModel(data.modelId);
        break;
        
      case 'chat':
        if (!engine) {
          self.postMessage({ 
            type: 'error', 
            data: { message: 'Model not initialized' } 
          });
          return;
        }
        await generateResponse(data.messages);
        break;
        
      case 'unload':
        if (engine) {
          await engine.unload();
          engine = null;
        }
        self.postMessage({ type: 'unloaded' });
        break;
        
      default:
        self.postMessage({ 
          type: 'error', 
          data: { message: `Unknown message type: ${type}` } 
        });
    }
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      data: { message: error.message } 
    });
  }
};

// Initialize the ML model
async function initializeModel(modelId) {
  try {
    // Create engine instance
    engine = new webllm.MLCEngine();
    
    // Set up progress callback
    const progressCallback = (progress) => {
      self.postMessage({
        type: 'download-progress',
        data: {
          modelId: modelId,
          progress: progress.progress || 0,
          total: progress.total || 100,
          loaded: progress.loaded || 0
        }
      });
    };
    
    // Load the model
    await engine.reload(modelId, undefined, {
      initProgressCallback: progressCallback
    });
    
    // Notify that model is loaded
    self.postMessage({ 
      type: 'model-loaded', 
      data: { modelId: modelId } 
    });
    
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      data: { message: `Failed to initialize model: ${error.message}` } 
    });
  }
}

// Generate AI response
async function generateResponse(messages) {
  try {
    const response = await engine.chat.completions.create({
      messages: messages,
      temperature: 0.7,
      max_tokens: 512,
      stream: false
    });
    
    self.postMessage({
      type: 'chat-response',
      data: {
        content: response.choices[0]?.message?.content || 'No response generated',
        usage: response.usage
      }
    });
    
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      data: { message: `Failed to generate response: ${error.message}` } 
    });
  }
}

// Handle worker errors
self.onerror = function(error) {
  self.postMessage({ 
    type: 'error', 
    data: { message: `Worker error: ${error.message}` } 
  });
};

// Signal that worker is ready
self.postMessage({ type: 'worker-ready' });