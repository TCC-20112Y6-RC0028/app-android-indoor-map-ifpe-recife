package br.edu.ifpe.mapindoornfc;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
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


public class QuartosJsonActivity extends Activity {

    private Spinner spSetor;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quartos_json);
        spSetor = (Spinner) findViewById(R.id.spSala);




        new DownloadJsonAsyncTask().execute("https://3-dot-map-indoor-ifpe-recife-1021.appspot.com/ServletJsonMap");
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_quartos_json, menu);
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

    class DownloadJsonAsyncTask extends AsyncTask<String, Void, List<Quarto>> {

        ProgressDialog dialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = ProgressDialog.show(QuartosJsonActivity.this, "Aguarde",
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

        public  JSONObject readJsonFromUrl(InputStream is) throws IOException, JSONException {
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
                        QuartosJsonActivity.this,
                        android.R.layout.simple_spinner_item, result);
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
           spSetor.setAdapter(adapter);

                spSetor.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

                        Toast.makeText(parent.getContext(),
                                "OnItemSelectedListener : " + ((Quarto) parent.getItemAtPosition(position)).getId(),
                                Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });

            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(
                        QuartosJsonActivity.this).setTitle("Atenção")
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
//
//    @Override
//    protected void onListItemClick(ListView l, View v, int position, long id) {
//        super.onListItemClick(l, v, position, id);
//
//        Quarto quarto = (Quarto)l.getAdapter().getItem(position);
//
////        Intent it = new Intent(Intent.ACTION_VIEW, Uri.parse(quarto.url));
//        Toast.makeText(null, quarto.toString(), Toast.LENGTH_SHORT);
////        startActivity(it);
//    }
//

}



