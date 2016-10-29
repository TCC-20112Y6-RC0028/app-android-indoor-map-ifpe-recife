package br.edu.ifpe.mapindoornfc;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;


public class ReaderActivity extends ActionBarActivity {

    private NfcAdapter myNfcAdapter;
    private TextView myText;
    private String payload;
    private Spinner spSetor;
        private  TextView tvPpi;
    private Button btVisitarUrl;
    private byte payloadHeader;
    private ForegroundDispatcher foregroundDispatcher;
    private  NdefMessage[] messages;
    private String destin =  new String();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reader);
         foregroundDispatcher = new NfcForegroundDispatcher(this);
        tvPpi = (TextView) findViewById(R.id.tvPpi);
        btVisitarUrl = (Button) findViewById(R.id.btVisitarUrl);

        addListenerOnSpinnerItemSelection();

        new DownloadJsonAsyncTask().execute("https://3-dot-map-indoor-ifpe-recife-1021.appspot.com/ServletJsonMap");



        btVisitarUrl.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if((destin != null && destin != "")) {
                    Intent webViewIntent = new Intent(v.getContext(), WebViewActivity.class);
                    payload = payload.replace("\u0001", "");
                    String url = "http://" + payload + destin;
                    webViewIntent.putExtra("url", url);
                    startActivity(webViewIntent);
                }
            }
        });
    }

    public void forwardWebViewURL(){
        btVisitarUrl.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(payloadHeader==0x01) {
                    Intent data = new Intent();
                    data.setAction(Intent.ACTION_VIEW);
                    data.setData(Uri.parse("http://" + payload));
                    try {
                        startActivity(data);
                    } catch (ActivityNotFoundException e) {
                        return;
                    }

                }
            }
        });

    }

    public void addListenerOnSpinnerItemSelection() {
        spSetor = (Spinner) findViewById(R.id.spSector);
      /*  spSetor.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

                destin = parent.getItemAtPosition(position).toString().substring(0,parent.getItemAtPosition(position).toString().indexOf("-"));
                Toast.makeText(parent.getContext(),
                        "OnItemSelectedListener : " + parent.getItemAtPosition(position).toString(),
                        Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });*/
    }

    NdefMessage[] getNdefMessages(Intent intent) {
        NdefMessage[] message = null;
        if (NfcAdapter.ACTION_TAG_DISCOVERED.equals(intent.getAction())) {
            Parcelable[] rawMessages =
                    intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);
            if (rawMessages != null) {
                message = new NdefMessage[rawMessages.length];
                for (int i = 0; i < rawMessages.length; i++) {
                    message[i] = (NdefMessage) rawMessages[i];
                }
            } else {
                byte[] empty = new byte[] {};
                NdefRecord record = new NdefRecord ( NdefRecord.TNF_WELL_KNOWN,empty, empty, empty );
                NdefMessage msg = new NdefMessage( new NdefRecord[] { record } );
                message = new NdefMessage[] { msg };
            }
        }/* else {
            Log.d("", "Unknown intent.");
            finish();
        }*/
        return message;
    }

    @Override
    public void onNewIntent(Intent intent) {

            Tag detectedTag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
            Intent intentContext = getIntent();
            messages =  getNdefMessages(intent);
    /*    for(int i=0;i<messages.length;i++){
            for(int j=0;j<messages[0].getRecords().length;j++) {

                NdefRecord record = messages[i].getRecords()[j];

                payload = new String(record.getPayload());
               // Toast.makeText(this,payload,Toast.LENGTH_LONG).show();

                byte payloadHeader = record.getPayload()[0];

            }
            }*/

              NdefRecord[] record = messages[0].getRecords();
            if(record != null) {
                payload = new String(record[0].getPayload());
                payloadHeader = record[0].getPayload()[0];
                String ppi = payload.substring(payload.indexOf("=")+1, payload.indexOf("&") );
                if (ppi != null && ppi != "") {
                    tvPpi.setText(ppi);
                    btVisitarUrl.setVisibility(View.VISIBLE);
                    Toast.makeText(this, "https://" + payload + destin ,Toast.LENGTH_LONG).show();
                }

            }else{


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


    @Override
    public void onResume() {
        super.onResume();
        foregroundDispatcher.enable();
    }

    @Override
    public void onPause() {
        super.onPause();
        foregroundDispatcher.disable();
    }


    class DownloadJsonAsyncTask extends AsyncTask<String, Void, List<Quarto>> {

        ProgressDialog dialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = ProgressDialog.show(ReaderActivity.this, "Aguarde",
                    "Baixando JSON, Por Favor Aguarde...");
        }

        @Override
        protected List<Quarto> doInBackground(String... params) {
            String urlString = params[0];

            HttpClient httpclient = new DefaultHttpClient();
            HttpGet httpget = new HttpGet(urlString);

            try {
                HttpResponse response = httpclient.execute(httpget);

                HttpEntity entity = response.getEntity();

                if (entity != null) {
                    InputStream instream = entity.getContent();

                    String json = toString(instream);

                    //JSONObject temp = readJsonFromUrl(instream);

                    instream.close();



                    List<Quarto> Quartos = getQuartos(json);

                    return Quartos;
                }
            } catch (Exception e) {
                Log.e("INDOORMAP", "Falha ao acessar Web service", e);
            }
            return null;

        }

        private  String readAll(Reader rd) throws IOException {
            StringBuilder sb = new StringBuilder();
            int cp;
            while ((cp = rd.read()) != -1) {
                sb.append((char) cp);
            }
            return sb.toString();
        }

        public JSONObject readJsonFromUrl(InputStream is) throws IOException, JSONException {
            try {
                BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
                String jsonText = readAll(rd);
                JSONObject json = new JSONObject(jsonText);
                return json;
            } finally {
                is.close();
            }
        }

        private List<Quarto> getQuartos(String jsonString) {

            List<Quarto> quartos = new ArrayList<Quarto>();

            try {

//                JSONArray QuartoLists = new JSONArray(jsonString);
//                JSONObject QuartoList = QuartoLists.getJSONObject(0);
                Log.i("INDOORMAP",  jsonString);
                JSONObject jObject = new JSONObject(jsonString);

                JSONArray QuartosArray = jObject.getJSONArray("vertices");


                JSONObject quarto;

                for (int i = 0; i < QuartosArray.length(); i++) {
                    quarto = new JSONObject(QuartosArray.getString(i));

                    Log.i("INDOORMAP", "id=" + quarto.getString("id"));

                    Quarto objetoQuarto = new Quarto();
                    objetoQuarto.id = quarto.getString("id");
                    objetoQuarto.desc = quarto.getString("desc");
                    objetoQuarto.sig = quarto.getString("sig");
                    objetoQuarto.ppi =  quarto.getString("ppi");


                    quartos.add(objetoQuarto);
                }
            } catch (JSONException e) {
                Log.e("INDOORMAP", "Erro no parsing do JSON", e);
            }

            return quartos;
        }

        @Override
        protected void onPostExecute(List<Quarto> result) {
            super.onPostExecute(result);
            dialog.dismiss();
            if (result.size() > 0) {
                ArrayAdapter<Quarto> adapter = new ArrayAdapter<Quarto>(
                        ReaderActivity.this,
                        android.R.layout.simple_spinner_item, result);
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                spSetor.setAdapter(adapter);

                spSetor.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

                        destin = ((Quarto) parent.getItemAtPosition(position)).getId();
                        Toast.makeText(parent.getContext(),
                                "Value Point  NFC: " + ((Quarto) parent.getItemAtPosition(position)).getId(),
                                Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });

                Toast.makeText(ReaderActivity.this,"Escolha o destino e depois Aproxime seu aparelho ao etiqueta inteligente  NFC",Toast.LENGTH_LONG).show();


            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(
                        ReaderActivity.this).setTitle("Atenção")
                        .setMessage("Não foi possivel acessar a lista de destino servidor essas informções. Verifque a conexao com internet!")
                        .setPositiveButton("OK", null);
                builder.create().show();
            }
        }

        private String toString(InputStream is) throws IOException {

            byte[] bytes = new byte[2048];
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            int lidos;
            while ((lidos = is.read(bytes)) > 0) {
                baos.write(bytes, 0, lidos);
            }
            return baos.toString();
        }
    }


}
