package br.edu.ifpe.mapindoornfc;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.Toast;


public class WebViewWithoutNFC extends ActionBarActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view_without_nfc);
        /*setContentView(R.layout.frame_layout_webview_sample);*/

/*
        final FrameLayout fl = (FrameLayout) findViewById(R.id.frameLayout);
*/
        String url =   "http://3-dot-map-indoor-ifpe-recife-1021.appspot.com/mobile_welcome.html";
        //testing access assests folder
/*
        url = "file:///android_asset/www/view.html";
*/



        final ProgressBar pb = new ProgressBar(this);
        FrameLayout.LayoutParams lp = new FrameLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        lp.gravity = Gravity.CENTER;
        pb.setLayoutParams(lp);

        final FrameLayout fl = (FrameLayout) findViewById(R.id.container);
        final WebView webView = (WebView) findViewById(R.id.webView1);

        webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>");


        webView.getSettings().setJavaScriptEnabled(true);
      /*  webView.getSettings().setLoadWithOverviewMode(true);
        webView.getSettings().setUseWideViewPort(true);*/
        //Zoom
        webView.getSettings().setSupportZoom(true);
   /*     webView.getSettings().setBuiltInZoomControls(true);*/
      /*  webView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
        webView.setScrollbarFadingEnabled(false);

*/

        /*webView.setWebChromeClient(new WebChromeClient());*/
        webView.loadUrl(url);

        webView.setWebChromeClient(new WebChromeClient() {


                                       public boolean shouldOverrideUrlLoading(WebView view, String url) {
                                           if (Uri.parse(url).getHost().equals("3-dot-map-indoor-ifpe-recife-1021.appspot.com")) {
                                               // This is my web site, so do not override; let my WebView load the page
                                               return true;
                                           }

                                           Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                                           startActivity(intent);
                                           return false;

                                       }

                                       public void onPageStarted(WebView view, String url, Bitmap favicon) {
                                           pb.setVisibility(View.VISIBLE);
                                           fl.addView(pb);
                                           Toast.makeText(WebViewWithoutNFC.this, "Aguarde! Carregando... ", Toast.LENGTH_LONG).show();

                                       }


                                       public void onPageFinished(WebView view, String url) {
                                           //ProgressBar pb = (ProgressBar) findViewById(R.id.progress);
                                           //pb.setVisibility(View.INVISIBLE);
                                           pb.setVisibility(View.INVISIBLE);
                                           fl.removeView(pb);

                                           webView.setVisibility(View.VISIBLE);
                                       }
                                   }


        );



    }

}
