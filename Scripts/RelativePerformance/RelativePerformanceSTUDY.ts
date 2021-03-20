# Pratik Shah 2/9/2021
# Compares performance bewteen stock and index

declare lower;

def stockPrice = close;
def qqqPrice = close("QQQ");
def spxPrice = close("SPX");
def diaPrice = close("DIA");

plot stock = Round(((stockPrice - First(stockPrice)) / First(stockPrice)) * 100, 2);
plot spx = Round(((spxPrice - First(spxPrice)) / First(spxPrice)) * 100, 2);
plot qqq = Round(((qqqPrice - First(qqqPrice)) / First(qqqPrice)) * 100, 2);
plot dia = Round(((diaPrice - First(diaPrice)) / First(diaPrice)) * 100, 2);
