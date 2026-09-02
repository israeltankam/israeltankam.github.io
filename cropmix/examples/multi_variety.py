import cropmix as cm

field = cm.Field.rectangular(5, 5)

def variety(name, aq, ino, yh, yi):
    return cm.Variety(name, cm.HostTransmission(aq, ino), cm.PlantParameters(1/20), cm.YieldParameters(yh, yi, "relative"))

system = cm.CropMixSystem(
    varieties=(variety("A",.8,.25,1,.5), variety("B",.5,.18,.95,.6), variety("C",.25,.08,.85,.75)),
    vector=cm.VectorParameters(.15,.35),
    pathogen=cm.PathogenParameters(1.2,"SPT"),
    kernel=cm.ExponentialKernel(1.5),
)
design = cm.MixtureDesign.random(field,{"A":10,"B":8,"C":7},seed=5)
scenario = cm.Scenario(duration=90,vectors_per_plant=4,inoculum=cm.Inoculum.random(1))
result = cm.simulate_mixture(design,system,scenario,n_runs=10,seed=10)
print(design.counts)
print(result.summary())
