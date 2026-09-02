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

field=cm.Field.rectangular(4,4)
scenario=cm.Scenario(duration=50,vectors_per_plant=3,inoculum=cm.Inoculum.random(1))
config=cm.OptimizationConfig(iterations=8,n_runs_per_candidate=2,final_runs=4,seed=3)
opt=cm.optimize_mixture(field,{"A":8,"B":8},make_system(),scenario,objective="expected_yield",config=config)
print(opt.summary())
print(opt.best_design.counts)
