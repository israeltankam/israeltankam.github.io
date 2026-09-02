from cropmix.epipvr import AccessPeriodAssay, AccessPeriodExperiment, EpiPvrBackend

aap=AccessPeriodAssay((2,3,4,5),(30,30,30,30),(10,15,18,20))
iap=AccessPeriodAssay((.25,.5,.75,1.0),(30,30,30,30),(5,10,15,20))
experiment=AccessPeriodExperiment.spt(acquisition=aap,inoculation=iap,fixed_inoculation_for_acquisition=6,fixed_acquisition_for_inoculation=4,vectors_per_plant=20)
backend=EpiPvrBackend()
status=backend.check_installation()
print(status)
if status.get("rscript") and status.get("epipvr"):
    fit=backend.fit(experiment)
    print(fit.parameter_summary())
else:
    print("R/EpiPvr is not available; fit step skipped.")
