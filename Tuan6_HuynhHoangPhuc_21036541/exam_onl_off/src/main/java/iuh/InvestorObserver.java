package iuh;

class InvestorObserver implements StockObserver {
    private String investorName;

    public InvestorObserver(String investorName) {
        this.investorName = investorName;
    }

    @Override
    public void update(double newPrice) {
        System.out.println("Nha dau tu " + investorName + " nhan thon bao: Gia co phieu da thay doi thanh " + newPrice);
    }
}

