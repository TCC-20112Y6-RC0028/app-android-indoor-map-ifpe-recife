package br.edu.ifpe.mapindoornfc;

import android.nfc.NdefMessage;
import android.nfc.NfcAdapter;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;


public class CheckNFCFeatureActivity extends ActionBarActivity {

    private NfcAdapter myNfcAdapter;
    private TextView myText;
    private NdefMessage[] messages;
    private String payload;
    private  byte payloadHeader;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        myText = (TextView) findViewById(R.id.myText);
        myNfcAdapter = NfcAdapter.getDefaultAdapter(this);

        if(myNfcAdapter == null){
            myText.setText("NFC is not available for the device!");
        }else{
            myText.setText("NFC is  available for the device!");
        }
    }




    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
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
    }
}
