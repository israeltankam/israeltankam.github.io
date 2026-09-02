import pandas as pd
import cropmix as cm

data = pd.DataFrame({
    "site_id":["p1","p2","p3","p4","p5","p6"],
    "x":[0,1,2,0.5,1.5,1],
    "y":[0,0,0,1,1,2],
    "variety":["A","A","B","B","A","B"],
})
design = cm.MixtureDesign.from_dataframe(data)
print(design.counts)
print(design.proportions)
print(design.to_dataframe())
