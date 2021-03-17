package com.nexsoft.buku.model;

public class Grafik {

    private String label;
    private int data;

    public Grafik(String label, int data) {
        this.label = label;
        this.data = data;
    }

    public Grafik(int data) {
        this.data = data;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getData() {
        return data;
    }

    public void setData(int data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "grafik{" +
                "label='" + label + '\'' +
                ", data=" + data +
                '}';
    }
}
