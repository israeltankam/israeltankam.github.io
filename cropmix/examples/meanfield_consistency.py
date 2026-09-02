import cropmix as cm

def make_system():
    a = cm.Variety(
        name="A",
        transmission=cm.HostTransmission(0.80, 0.25),
        plant=cm.PlantParameters(1/18, 0.0),
        yield_model=cm.YieldParameters(1.0, 0.45, unit="relative yield"),
    )
    b = cm.Variety(
        name="B",
        transmission=cm.HostTransmission(0.35, 0.10),
        plant=cm.PlantParameters(1/18, 0.0),
        yield_model=cm.YieldParameters(0.90, 0.65, unit="relative yield"),
    )
    return cm.CropMixSystem(
        varieties=(a,b),
        vector=cm.VectorParameters(0.15, 0.40),
        pathogen=cm.PathogenParameters(1.5, transmission_mode="SPT"),
        kernel=cm.ExponentialKernel(scale=1.5),
    )

import numpy as np
field=cm.Field.rectangular(4,4)
design=cm.MixtureDesign.random(field,{"A":8,"B":8},seed=1)
system=make_system()
scenarios=[cm.Scenario(duration=40,vectors_per_plant=m,inoculum=cm.Inoculum.random(1)) for m in (1,3)]
# Keep the grid intentionally small in this example.
res=cm.assess_mean_field_consistency(field,system,scenarios,reference_variety="A",scales=np.array([0.8,1.5,3.0]),n_runs=3,observation_times=np.linspace(0,40,9),bootstrap_reps=3,seed=12)
print(res.summary())
