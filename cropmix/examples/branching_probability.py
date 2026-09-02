from cropmix.epipvr import EpiPvrBackend, LocalEpidemicParameters

backend=EpiPvrBackend()
status=backend.check_installation()
print(status)
if status.get("rscript") and status.get("epipvr"):
    local=LocalEpidemicParameters(dispersal_rate=.4,roguing_rate=0,harvest_rate=1/300,vector_mortality_rate=.15,plant_latent_progression_rate=1/20)
    out=backend.epidemic_probability(vectors_per_plant=5,virus_parameters_per_day=(.8,.25,1.5),local_parameters=local)
    print(out.probabilities)
else:
    print("R/EpiPvr is not available; branching-process call skipped.")
