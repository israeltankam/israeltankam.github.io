import cropmix as cm
from cropmix.metrics import pairwise_mixing_metrics

field=cm.Field.from_coordinates([(0,0),(1,0),(2,0),(0.5,1),(1.5,1),(1,2)])
design=cm.MixtureDesign(field,("A","B","A","B","A","B"))
print(pairwise_mixing_metrics(design,radius=1.2))
