# Pratik Shah
# Calculates then distance the average is from the price
# 4/26/2020

declare lower;

input length = 20;
input length2 = 10;
input averageType = AverageType.Exponential;
input price = close;

def avg = MovingAverage(averageType, close, length);
def avg2 = MovingAverage(averageType, close, length2);

assert(length > 0, "'length' must be positive: " + length);
assert(length2 > 0, "'length' must be positive: " + length2);

plot DFML1 = if price[length] != 0 then Round( ((price - avg) / avg) * 100, 2) else 0;
plot DFML2 = if price[length2] != 0 then Round( ((price - avg2) / avg2) * 100, 2) else 0;
plot ZeroLine = 0;

DFML1.SetDefaultColor(Color.BLACK);
DFML2.SetDefaultColor(Color.RED);
ZeroLine.SetDefaultColor(Color.WHITE);