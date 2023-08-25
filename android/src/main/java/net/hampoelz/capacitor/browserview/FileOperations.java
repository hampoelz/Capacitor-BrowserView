package net.hampoelz.capacitor.browserview;

import android.content.Context;
import androidx.annotation.RawRes;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class FileOperations {

    public static String ReadRawFile(Context context, @RawRes int id) throws IOException {
        final StringBuilder builder = new StringBuilder();

        final InputStream inputStream = context.getResources().openRawResource(id);
        final BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

        String line;
        while ((line = reader.readLine()) != null) {
            builder.append(line);
            builder.append("\n");
        }

        reader.close();

        return builder.toString();
    }
}
