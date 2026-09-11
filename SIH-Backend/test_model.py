from ml.predictor import model, FEATURE_COLUMNS

print("MODEL LOADED:", type(model).__name__)
print("FEATURE COUNT:", len(FEATURE_COLUMNS))

print("\nFIRST 10 FEATURES:")
print(FEATURE_COLUMNS[:10])

print("\nLAST 10 FEATURES:")
print(FEATURE_COLUMNS[-10:])

print("\nMODEL CLASSES:")
print(model.classes_)

print("\nMODEL N_ESTIMATORS:")
print(model.n_estimators)