package com.cibershield.app;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.nio.file.Files;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;

@SpringBootApplication
public class CiberShieldApplication {

    public static void main(String[] args) {

        String walletResourcePath = "wallet";

        try {
            File tempWalletDir = Files.createTempDirectory("wallet-").toFile();
            tempWalletDir.deleteOnExit(); 

            String[] walletFiles = {"tnsnames.ora", "ojdbc.properties", "ewallet.p12", "cwallet.sso", "keystore.jks", "truststore.jks"};
            
            for (String fileName : walletFiles) {
                try (InputStream in = new ClassPathResource(walletResourcePath + "/" + fileName).getInputStream()) {
                    FileCopyUtils.copy(in, new FileOutputStream(new File(tempWalletDir, fileName)));
                }
            }

            System.setProperty("oracle.net.tns_admin", tempWalletDir.getAbsolutePath());
            System.setProperty("oracle.net.wallet_location", "(SOURCE=(METHOD=file)(METHOD_DATA=(DIRECTORY=" + tempWalletDir.getAbsolutePath() + ")))");
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
        

        SpringApplication.run(CiberShieldApplication.class, args);
    }

}
