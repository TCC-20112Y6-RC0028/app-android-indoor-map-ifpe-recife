package br.edu.ifpe.mapindoornfc;

import android.content.Intent;
import android.net.Uri;
import android.nfc.NfcAdapter;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;


public class Options extends ActionBarActivity {


    private NfcAdapter myNfcAdapter;
    private Button btReader;
    private Button btWriter;
    private Button btWithoutNFC;
    private WIFI wifi;
    private Button btNFC;
    private WiFiController wiFiController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.options);

        btWithoutNFC = (Button) findViewById(R.id.bt_without_nfc);
        btNFC = (Button) findViewById(R.id.bt_nfc);

        myNfcAdapter = NfcAdapter.getDefaultAdapter(this);

        wifi = new WiFiController(this.getBaseContext());
/*
        wiFiController = new WiFiController(this.getBaseContext());
*/
    /*    if (avaliarConexaoWifi()) {

        } else {*/


            btWithoutNFC.setOnClickListener(new View.OnClickListener() {
                                                @Override
                                                public void onClick(View v) {

                                                    /*startActivity(new Intent(v.getContext(), WebViewWithoutNFC.class));*/
                                                /*  final  Intent intent = new Intent();
                                                    intent.setComponent(new ComponentName("com.google.android.browser","com.google.android.browser.BrowserActivity"));
                                                    intent.setAction("android.intent.action.VIEW");
                                                    intent.addCategory("android.intent.category.BROWSABLE");
                                                    Uri uri = Uri.parse("http://3-dot-map-indoor-ifpe-recife-1021.appspot.com/view.html");
                                                    intent.setData(uri);
                                                    try
                                                    {
                                                        startActivity(intent);
                                                    }
                                                    catch (Exception e)
                                                    {
                                                        e.printStackTrace();
                                                    }

                                                    startActivity(intent);*/
                                                    openWebPage(null);
                                                }

                                            }

            );
            if (myNfcAdapter == null) {

                btNFC.setVisibility(View.INVISIBLE);


                Toast.makeText(this, "NFC não está disponível para seu o dispositivo! ", Toast.LENGTH_SHORT).show();


            } else {

                btNFC.setOnClickListener(new View.OnClickListener() {
                                             @Override
                                             public void onClick(View v) {

                                                 startActivity(new Intent(v.getContext(), MainActivity.class));
                                             }
                                         }

                );


                Toast.makeText(this, "Selecione a opção", Toast.LENGTH_SHORT).show();

            }
        /*}*/


    }


    public boolean avaliarConexaoWifi() {
        if (wifi.checkWifiEnabled() == false) {
            Toast.makeText(this, "Verifique o estado da conexão Wifi!", Toast.LENGTH_LONG).show();



        }else{
            /*int resultStateWifi = wifi.getWifiManager().getWifiState();
            if (resultStateWifi == WifiManager.WIFI_STATE_ENABLED) {

                if (wifi.getWifiManager().pingSupplicant() == false) {
                    Toast.makeText(this, "Conexao baixa para realizar download dos recursos!", Toast.LENGTH_LONG).show();
                } else {
                    return true;
                }

            } else {
                Toast.makeText(this, "Verifique o estado da conexão Wifi!", Toast.LENGTH_LONG).show();
            }*/

        }
        return false;
    }

    public void openWebPage(String url) {
        Uri webpage = Uri.parse("http://3-dot-map-indoor-ifpe-recife-1021.appspot.com/mobile_welcome.html");
        Intent intent = new Intent(Intent.ACTION_VIEW, webpage);
        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        }
    }
}



