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

field=cm.Field.rectangular(5,5)
design=cm.MixtureDesign.random(field,{"A":13,"B":12},seed=2)
scenario=cm.Scenario(duration=90,vectors_per_plant=4,inoculum=cm.Inoculum.random(1))
r=cm.simulate_mixture(design,make_system(),scenario,n_runs=20,seed=17)
print("mean yield:",r.mean_yield)
print("yield SD:",r.yield_sd)
print("yield SE:",r.yield_se)
print("final incidence mean:",r.mean_final_incidence)
print("final incidence SD:",r.final_incidence_sd)
print(r.trajectory_dataframe().head())
