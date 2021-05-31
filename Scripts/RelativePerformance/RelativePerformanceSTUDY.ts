# Pratik Shah 2/9/2021, 5/31/2021 V2.0
# Compares performance bewteen stock and index

declare lower;

input YTD_Performance = No;

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
       stockCalc = First(stockPrice);
       qqqCalc = First(qqqPrice);
       spxCalc = First(spxPrice);
       diaCalc = First(diaPrice);
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
AddLabel(yes, "STOCK: " + Round(stock) + "%", if stock > spx then Color.LIGHT_GREEN else if  stock < spx then Color.DARK_RED else Color.White );
AddLabel(yes, "SPX: " + Round(spx) + "%", Color.Black);
AddLabel(yes, "QQQ: " + Round(qqq) + "%", Color.Black);
AddLabel(yes, "DIA: " + Round(dia) + "%", Color.Black);
