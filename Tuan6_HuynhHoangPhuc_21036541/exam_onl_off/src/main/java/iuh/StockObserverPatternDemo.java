package iuh;

public class StockObserverPatternDemo {
    public static void main(String[] args) {
        StockSubject appleStock = new StockSubject("Apple Inc.", 150.0);

        InvestorObserver investorA = new InvestorObserver("Nguyen Van A");
        InvestorObserver investorB = new InvestorObserver("Nguyen Van B");

        appleStock.addObserver(investorA);
        appleStock.addObserver(investorB);

        System.out.println("\nGia co phieu thay doi:");
        appleStock.setStockPrice(155.0);

        System.out.println("\nNha dau tu B quyet dinh huy tham gia theo doi:");
        appleStock.removeObserver(investorB);

        System.out.println("\nGia co phieu thay doi:");
        appleStock.setStockPrice(160.0);
    }
}

