package br.edu.ifpe.mapindoornfc;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;


public class Welcome extends ActionBarActivity {

    private Button btReader;
    private WIFI wifi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.welcome);

        btReader = (Button) findViewById(R.id.bt_reader);
       /* wifi = new WiFiController(this.getBaseContext());

        if(wifi.checkWifiEnabled()) {*/


            btReader.setOnClickListener(new View.OnClickListener() {
                                            @Override
                                            public void onClick(View v) {

                                                startActivity(new Intent(v.getContext(), Options.class));
                                            }
                                        }

            );
            Toast.makeText(this, "Seja Bem-Vindo Indoor Map IFPE Recife!", Toast.LENGTH_SHORT).show();

        /*}else{
            Toast.makeText(this, "Nao Conectado Rede Wifi!", Toast.LENGTH_SHORT).show();

        }*/

    }


 /*   @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }*/

   /* @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }*/
}
