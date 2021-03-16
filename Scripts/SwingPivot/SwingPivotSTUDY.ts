# Pratik Shah v1.28.21 
# Find trend changes in hourly timeframe
# Identify Higher Highs and Higher Lows and vice versa.

declare once_per_bar;

# SWING PIVOT SIGNALS
# Rules
# - Stock is in a long term uptrend
# - If open < 50 1hr EMA and close > 10, 20, 50 EMA DONE
# - Close > 20 HEMA 3% DONE
# - Volume > VMA(10) DONE
# - Close is 90% or more
# - Current bar > Bar DONE

def FiftyHourEMA = MovingAverage(AverageType.EXPONENTIAL, Fundamental(FundamentalType.CLOSE, period = AggregationPeriod.HOUR), 50);
def TwentyHourEMA = MovingAverage(AverageType.EXPONENTIAL, Fundamental(FundamentalType.CLOSE, period = AggregationPeriod.HOUR), 20);
def TenHourEMA = MovingAverage(AverageType.EXPONENTIAL, Fundamental(FundamentalType.CLOSE, period = AggregationPeriod.HOUR), 10);

def RSI = RSI(price = close(period = AggregationPeriod.HOUR)) >= 50;

def pClose = close;
def Vol = volume;
def getHighestClose = Highest(close, 10);
def getHighestHigh = Highest(high, 10);
def avgTrueRange = (ATR(1) / ATR(5)) >= 1.10;

# Reversal Non-Gap
def closeAbovPct = ((pClose - TwentyHourEMA) / TwentyHourEMA) * 100 >= 1.0;
def curBarGreaterLastBar = close > close[1];
def curVolume = Vol > VolumeAvg(5).VolAvg;
def candleStickLong = (IsLongWhite(1) or ((pClose - low) / (high - low)) * 100 >= 90);
def highestBars = pClose >= getHighestClose;
def BarCloseNearTop = ((pClose - low) / (high - low)) * 100 >= 70;
def PCloseVsOpen = (open <= FiftyHourEMA or open <= TwentyHourEMA or (open * .99 <= TenHourEMA and BarCloseNearTop and TwentyHourEMA > FiftyHourEMA)) and pClose > TenHourEMA and pClose > TwentyHourEMA and pClose > FiftyHourEMA;


def result = if curBarGreaterLastBar and RSI and highestBars and BarCloseNearTop and closeAbovPct and PCloseVsOpen and avgTrueRange and (candleStickLong or curVolume) then high * 1.01 else Double.NaN;

plot ReversalSignal = result;
ReversalSignal.SetPaintingStrategy(paintingStrategy = PaintingStrategy.ARROW_DOWN);
ReversalSignal.SetDefaultColor(Color.WHITE);


# TRENDS
# Plots highs and lows for previous day to find trend changes (higher highs and higher lows etc..)

def getHighVal = High(period = AggregationPeriod.DAY);
def getLowVal = Low(period = AggregationPeriod.DAY);

plot yesterdayHigh = getHighVal +.03;
plot yesterdayLow = getLowVal - .03;

def upTrend = yesterdayHigh >= yesterdayHigh[1] and yesterdayLow >= yesterdayLow[1];
def downTrend = yesterdayHigh < yesterdayHigh[1] and yesterdayLow <= yesterdayLow[1];

yesterdayHigh.AssignValueColor(if upTrend then Color.GREEN else if downTrend then Color.RED else Color.WHITE);
yesterdayLow.AssignValueColor(if upTrend then Color.GREEN else if downTrend then Color.RED else Color.WHITE);






