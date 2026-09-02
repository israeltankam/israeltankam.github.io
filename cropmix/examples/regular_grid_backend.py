from cropmix.publication_backend import prepare_structured_kernel

kernel=prepare_structured_kernel(N=20,scale=2.0)
print("N:",kernel.N)
print("scale:",kernel.scale)
print("mean step distance:",kernel.mean_step_distance)
print("max row error:",kernel.max_row_error)
