package iuh;

public class TaskObserverPatternDemo {
    public static void main(String[] args) {
        TaskSubject task = new TaskSubject("Phat trien giao dien", "Chua thuc hien");

        TeamMemberObserver memberA = new TeamMemberObserver("Nguyen Van A");
        TeamMemberObserver memberB = new TeamMemberObserver("Tran Thi B");

        task.addObserver(memberA);
        task.addObserver(memberB);

        System.out.println("\nCap nhat trang thai cong viec:");
        task.setTaskStatus("Dang thuc hien");

        System.out.println("\nCap nhat trang thai cong viec:");
        task.setTaskStatus("Hoan thanh");
    }
}
