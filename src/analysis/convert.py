import os
import tensorflow as tf
import tf2onnx
import onnx

print("Loading Keras model...")
# 1. Load your .keras file
keras_model_path = "your_model.keras"  # <--- Change if your filename is different
model = tf.keras.models.load_model(keras_model_path)

# 2. Save temporarily as a SavedModel folder to cleanly isolate weights & ops
temp_saved_model_dir = "temp_saved_model"
print("Preparing TensorFlow graph...")
model.save(temp_saved_model_dir)

# 3. Define the input shape matching EfficientNetV2 (Batch, Height, Width, Channels)
# Note: EfficientNetV2-B0 expects (1, 224, 224, 3)
input_signature = [tf.TensorSpec([1, 224, 224, 3], tf.float32, name="input_layer_2")]

print("Converting graph to ONNX format...")
# 4. Convert using tf2onnx
onnx_model, _ = tf2onnx.convert.from_keras(
    model, 
    input_signature=input_signature, 
    opset=15
)

# 5. Explicitly save the output file directly to disk
output_onnx_filename = "model_fixed.onnx"
onnx.save(onnx_model, output_onnx_filename)

print(f"\nSUCCESS! File successfully saved as: {output_onnx_filename}")