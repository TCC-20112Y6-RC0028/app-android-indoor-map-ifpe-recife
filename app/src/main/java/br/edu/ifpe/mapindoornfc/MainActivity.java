package br.edu.ifpe.mapindoornfc;

import android.content.Intent;
import android.nfc.NfcAdapter;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;


public class MainActivity extends ActionBarActivity {


    private NfcAdapter myNfcAdapter;
    private Button btReader;
    private Button btWriter;
    private WIFI wifi;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btReader = (Button) findViewById(R.id.bt_reader);
        btWriter = (Button) findViewById(R.id.bt_writer);

        myNfcAdapter = NfcAdapter.getDefaultAdapter(this);

        wifi = new WiFiController(this.getBaseContext());


        if (myNfcAdapter == null) {
            // is not available for the device!

            Toast.makeText(this, "NFC não está habilitado para o dispositivo! ", Toast.LENGTH_SHORT).show();

        } else {

/*
            if(wifi.checkWifiEnabled()) {
*/
            btReader.setVisibility(View.VISIBLE);
            btWriter.setVisibility(View.INVISIBLE);

            btReader.setOnClickListener(new View.OnClickListener() {
                                            @Override
                                            public void onClick(View v) {

                                                startActivity(new Intent(v.getContext(), ReaderActivity.class));
                                            }
                                        }

            );

            btWriter.setOnClickListener(new View.OnClickListener() {
                                            @Override
                                            public void onClick(View v) {
                                                startActivity(new Intent(v.getContext(), WriterActivity.class));
                                            }
                                        }

            );
           /* }else{
                Toast.makeText(this, "Nao Conectado Rede Wifi!", Toast.LENGTH_SHORT).show();
            }
*/
            Toast.makeText(this, "Selecione a opção", Toast.LENGTH_SHORT).show();

        }
    }


}
