package br.edu.ifpe.mapindoornfc;

/**
 * Created by Richardson on 16/06/2016.
 */
public class Quarto {

    String id;
    String desc;
    String sig;
    String ppi;

    public Quarto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getPpi() {
        return ppi;
    }

    public void setPpi(String ppi) {
        this.ppi = ppi;
    }

    public String getSig() {
        return sig;
    }

    public void setSig(String sig) {
        this.sig = sig;
    }

    public Quarto(String id, String sig, String desc, String ppi) {
        this.id = id;
        this.sig = sig;
        this.desc = desc;
        this.ppi = ppi;
    }

    @Override
    public String toString() {
     return    "ppi:" + this.ppi +
        " - sig:" + this.sig +
        " - desc:" + this.desc;


    }
}
