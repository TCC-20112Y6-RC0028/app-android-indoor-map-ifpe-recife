package br.edu.ifpe.mapindoornfc;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.Ndef;
import android.nfc.tech.NdefFormatable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
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


public class WriterActivity extends ActionBarActivity {

    private NfcAdapter myNfcAdapter;
    private TextView myText;
    private NdefMessage[] messages;
    private NfcForegroundDispatcher foregroundDispatcher;
    private final String LOG_WRITER_ACTIVITY= "WRITER_ACTIVITY";
    private String version = "";
    private String valuePointNFC = "";
    private Spinner spPointNFC;
    private Button btReady;
    private String urlAppHosted = null;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
           setContentView(R.layout.activity_writer);
        foregroundDispatcher = new NfcForegroundDispatcher(this);
        spPointNFC = (Spinner) findViewById(R.id.spPointNFC);
        btReady = (Button) findViewById(R.id.btReady);

        btReady.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 if(valuePointNFC != ""){
                     Toast.makeText(WriterActivity.this,"Aproxime seu aparelho da Tag  NFC p/ realizar a gravação",Toast.LENGTH_LONG).show();
                 }else{
                     Toast.makeText(WriterActivity.this,"Value Point NFC not configured!",Toast.LENGTH_SHORT).show();
                 }
            }
        });

        new DownloadJsonAsyncTask().execute("https://3-dot-map-indoor-ifpe-recife-1021.appspot.com/ServletJsonMap?tipo_vertice=ves");


      //  if (NfcAdapter.ACTION_NDEF_DISCOVERED.equals(getIntent().getAction())){





    }



    @Override
    public void onNewIntent(Intent intent) {


        if(NfcAdapter.ACTION_NDEF_DISCOVERED.equals(intent.getAction())){
            //Toast.makeText(this, "ACTION_NDEF_DISCOVERED",Toast.LENGTH_SHORT).show();
        }else  if(NfcAdapter.ACTION_TECH_DISCOVERED.equals(intent.getAction())){
           // Toast.makeText(this, "ACTION_TECH_DISCOVERED",Toast.LENGTH_SHORT).show();
        }else  if(NfcAdapter.ACTION_TAG_DISCOVERED .equals(intent.getAction())){
            //Toast.makeText(this, "ACTION_TAG_DISCOVERED",Toast.LENGTH_SHORT).show();
        }

        Tag detectedTag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
        // PREPARE THE NDEF MESSAGE

        String urlWriteNFC = "3-dot-map-indoor-ifpe-recife-1021.appspot.com/view.html?ppi="+ valuePointNFC +"&destin=";
        byte[] uriField = urlWriteNFC.getBytes(Charset.forName("US-ASCII"));
        byte[] payload = new byte[uriField.length + 1];
       payload[0] = 0x01;
        System.arraycopy(uriField, 0, payload, 1, uriField.length);
        NdefRecord uriRecord = new NdefRecord(
                NdefRecord.TNF_WELL_KNOWN, NdefRecord.RTD_URI, new byte[0], payload);
        NdefMessage newMessage= new NdefMessage(new NdefRecord[] { uriRecord });

        // WRITE DATA TO TAG

        writeNdefMessageToTag(newMessage,detectedTag);
        //}


    valuePointNFC = "";

    }

    boolean writeNdefMessageToTag(NdefMessage message, Tag detectedTag) {
        int size = message.toByteArray().length;
        try {
            Ndef ndef = Ndef.get(detectedTag);
            if (ndef != null) {
                ndef.connect();
                if (!ndef.isWritable()) {
                    Toast.makeText(this, "Tag is read-only.", Toast.LENGTH_SHORT).show();
                    return false;
                }
                if (ndef.getMaxSize() < size) {
                    Toast.makeText(this, "The data cannot written to tag,Tag capacity is " + ndef.getMaxSize() + " bytes, message is "
                            + size + " bytes.", Toast.LENGTH_SHORT).show();
                    return false;
                }
                ndef.writeNdefMessage(message);
                ndef.close();
                Toast.makeText(this, "Message is written tag.",Toast.LENGTH_SHORT).show();
                return true;
            } else {
                NdefFormatable ndefFormat = NdefFormatable.get(detectedTag);
                if (ndefFormat != null) {
                    try {
                        ndefFormat.connect();
                        ndefFormat.format(message);
                        ndefFormat.close();
                        Toast.makeText(this, "The data is written to the tag ", Toast.LENGTH_SHORT).show();
                        return true;
                    } catch (IOException e) {
                        Toast.makeText(this, "Failed to format tag",                                Toast.LENGTH_SHORT).show();
                        return false;
                    }
                } else {
                    Toast.makeText(this, "NDEF is not supported",Toast.LENGTH_SHORT).show();
                    return false;
                }
            }
        } catch (Exception e) {
            Toast.makeText(this, "Write opreation is failed",Toast.LENGTH_SHORT).show();
        }
        return false;
    }

    class DownloadJsonAsyncTask extends AsyncTask<String, Void, List<Quarto>> {

        ProgressDialog dialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = ProgressDialog.show(WriterActivity.this, "Aguarde",
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
                        WriterActivity.this,
                        android.R.layout.simple_spinner_item, result);
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                spPointNFC.setAdapter(adapter);

                spPointNFC.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

                        valuePointNFC = ((Quarto) parent.getItemAtPosition(position)).getId();
                        Toast.makeText(parent.getContext(),
                                "Value Point  NFC: " + ((Quarto) parent.getItemAtPosition(position)).getId(),
                                Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });

            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(
                        WriterActivity.this).setTitle("Atenção")
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


/*


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
*/


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
}
