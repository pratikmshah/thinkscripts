# Pratik Shah 2/9/2021
# Compares performance bewteen stock and index

declare lower;

input YTD_Performance = No;
input YearVerticalLine = Yes;

def checkYear = GetYear() == GetYear()[1];
def stockPrice = close[1];
def qqqPrice = close("QQQ")[1];
def spxPrice = close("SPX")[1];
def diaPrice = close("DIA")[1];

# claculated price if YTD 
def stockCalc;
def qqqCalc;
def spxCalc;
def diaCalc;

if YTD_Performance {
    if BarNumber() == 1 {
       stockCalc = stockPrice;
       qqqCalc = qqqPrice;
       spxCalc = spxPrice;
       diaCalc = diaPrice;
    } else if checkYear {
       stockCalc = stockCalc[1];
       qqqCalc = qqqCalc[1];
       spxCalc = spxCalc[1];
       diaCalc = diaCalc[1];
    } else {
       stockCalc = close[1];
       qqqCalc = close("QQQ")[1];
       spxCalc = close("SPX")[1];
       diaCalc = close("DIA")[1];
    }
} else {
    stockCalc = First(stockPrice);
    qqqCalc = First(qqqPrice);
    spxCalc = First(spxPrice);
    diaCalc = First(diaPrice);
}

plot stock = Round(((stockPrice - stockCalc) / stockCalc) * 100, 2);
plot spx = Round(((spxPrice - spxCalc) / spxCalc) * 100, 2);
plot qqq = Round(((qqqPrice - qqqCalc) / qqqCalc) * 100, 2);
plot dia = Round(((diaPrice - diaCalc) / diaCalc) * 100, 2);


# Add Labels
AddLabel(yes, "STOCK: " + Round(stock) + "%", if stock > 0 then Color.LIGHT_GREEN else if  stock < 0 then Color.DARK_RED else Color.White );
AddLabel(yes, "Alpha: " + Round(stock - spx) + "%", if Round(stock - spx) > 0 then Color.LIGHT_GREEN else if  Round(stock - spx) < 0 then Color.DARK_RED else Color.White);
AddLabel(yes, "SPX: " + Round(spx) + "%", Color.Black);
AddLabel(yes, "QQQ: " + Round(qqq) + "%", Color.Black);
AddLabel(yes, "DIA: " + Round(dia) + "%", Color.Black);

# Add Vertical Line
input period = {WEEK, MONTH, default YEAR};
input curve = {default FIRM, LONG_DASH, MEDIUM_DASH, SHORT_DASH, POINTS};
DefineGlobalColor("NewTimeFrame", GetColor(7));
AddVerticalLine(YearVerticalLine and (period == period.WEEK and GetWeek() <> GetWeek()[1]) or (period == period.MONTH and GetMonth() <> GetMonth()[1]) or (period == period.YEAR and GetYear() <> GetYear()[1]), "", GlobalColor("NewTimeFrame"), curve);