package br.edu.ifpe.mapindoornfc;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.ProgressBar;

/**
 * Created by Richardson on 16/12/2015.
 */
public class WebViewActivity extends Activity {

    private WebView webView;
    private ProgressBar pb;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.webview);
        final FrameLayout fl = (FrameLayout) findViewById(R.id.frameLayout);
        String url;
        if (savedInstanceState == null) {
            Bundle extras = getIntent().getExtras();
            if(extras == null) {
                url= null;
            } else {
                url= extras.getString("url");
            }
        } else {
            url= (String) savedInstanceState.getSerializable("url");
        }
        webView = (WebView) findViewById(R.id.webView1);
        webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>");


        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setLoadWithOverviewMode(true);
        webView.getSettings().setUseWideViewPort(true);

        webView.getSettings().setSupportZoom(true);
   /*     webView.getSettings().setBuiltInZoomControls(true);*/

        webView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
        webView.setScrollbarFadingEnabled(false);
        webView.setWebChromeClient(new WebChromeClient());
        /*webView.setWebViewClient(new WebViewClient());*/
       /* webView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon){
                pb = (ProgressBar) fl.findViewById(R.id.progress);
                pb.setVisibility(View.VISIBLE);
                fl.addView(pb);
            }

            @Override
            public void onPageFinished(WebView view, String url){
                pb = (ProgressBar) fl.findViewById(R.id.progress);
                pb.setVisibility(View.INVISIBLE);
                fl.removeView(pb);
                webView.setVisibility(View.VISIBLE);
            }
        });*/




        webView.loadUrl(url);


    }

}