package br.edu.ifpe.mapindoornfc;

import android.net.wifi.ScanResult;
import android.net.wifi.WifiConfiguration;

import java.util.List;

public interface WIFI {

	boolean checkWifiEnabled();

	boolean setWifiEnabled(boolean enable);

	boolean startWifiScan();

	void addWifiNetwork(WiFiConfigurator wifiConfigurator);

	void enableNetwork(int id);

	void connect();

	void disconnect() throws RuntimeException;

	List<ScanResult>  getScanResults();

	List<WifiConfiguration> getConfiguredNetworks();

}
