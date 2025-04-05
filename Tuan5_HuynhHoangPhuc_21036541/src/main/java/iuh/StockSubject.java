package iuh;

import java.util.ArrayList;
import java.util.List;

class StockSubject {
    private String stockName;
    private double stockPrice;
    private List<StockObserver> observers = new ArrayList<>();

    public StockSubject(String stockName, double initialPrice) {
        this.stockName = stockName;
        this.stockPrice = initialPrice;
    }

    public void addObserver(StockObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(StockObserver observer) {
        observers.remove(observer);
    }

    public void setStockPrice(double newPrice) {
        this.stockPrice = newPrice;
        notifyObservers();
    }

    private void notifyObservers() {
        for (StockObserver observer : observers) {
            observer.update(stockPrice);
        }
    }
}

