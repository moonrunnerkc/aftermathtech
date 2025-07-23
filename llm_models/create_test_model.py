import onnx
import numpy as np
from onnx import helper, TensorProto

# Create a minimal ONNX model for testing
def create_dummy_model():
    # Input
    input_tensor = helper.make_tensor_value_info('input_ids', TensorProto.INT64, [1, None])
    
    # Output  
    output_tensor = helper.make_tensor_value_info('logits', TensorProto.FLOAT, [1, None, 50257])
    
    # Simple identity operation for testing
    node = helper.make_node(
        'Identity',
        inputs=['input_ids'],
        outputs=['logits'],
        name='test_node'
    )
    
    # Create graph
    graph = helper.make_graph([node], 'test_model', [input_tensor], [output_tensor])
    
    # Create model
    model = helper.make_model(graph)
    
    # Save
    onnx.save(model, 'model.onnx')
    print("✅ Test model created for demo purposes")

if __name__ == "__main__":
    create_dummy_model()
