# Pratik Shah 2/9/2021
# Compares performance bewteen stock and index

declare lower;

def stockDay = close(period = AggregationPeriod.DAY);
def qqqDay = close("QQQ", period = AggregationPeriod.DAY);
def spxDay = close("SPX", period = AggregationPeriod.Day);

plot stock = Round(((stockDay - First(stockDay)) / First(stockDay)) * 100, 2);
plot spx = Round(((spxDay - First(spxDay)) / First(spxDay)) * 100, 2);
plot qqq = Round(((qqqDay - First(qqqDay)) / First(qqqDay)) * 100, 2);