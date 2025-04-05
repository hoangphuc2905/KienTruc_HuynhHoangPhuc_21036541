package iuh;

// Lớp thành viên nhóm theo dõi công việc
class TeamMemberObserver implements TaskObserver {
    private String memberName;

    public TeamMemberObserver(String memberName) {
        this.memberName = memberName;
    }

    @Override
    public void update(String newStatus) {
        System.out.println("Thanh vien " + memberName + " nhan thong bao: Trang thai cong viec moi -> " + newStatus);
    }
}

