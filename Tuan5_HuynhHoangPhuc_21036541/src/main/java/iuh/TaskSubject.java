package iuh;

import java.util.ArrayList;
import java.util.List;

class TaskSubject {
    private String taskName;
    private String taskStatus;
    private List<TaskObserver> observers = new ArrayList<>();

    public TaskSubject(String taskName, String initialStatus) {
        this.taskName = taskName;
        this.taskStatus = initialStatus;
    }

    public void addObserver(TaskObserver observer) {
        observers.add(observer);
    }

    public void setTaskStatus(String newStatus) {
        this.taskStatus = newStatus;
        notifyObservers();
    }

    private void notifyObservers() {
        for (TaskObserver observer : observers) {
            observer.update(taskStatus);
        }
    }
}

