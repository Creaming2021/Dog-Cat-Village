package donation.pet.util;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

import javax.mail.MessagingException;
import java.net.URL;
import java.util.Random;

public class MailUtil {

    private static JavaMailSender javaMailSender;

    public static String getKey(boolean lowerCheck, int size) {

        Random ran = new Random();
        StringBuffer sb = new StringBuffer();
        int num = 0;
        do {
            num = ran.nextInt(75) + 48;
            if ((num >= 48 && num <= 57)
                    || (num >= 65 && num <= 90)
                    || (num >= 97 && num <= 122)) {
                sb.append((char) num);
            } else {
                continue;
            }
        } while (sb.length() < size);
        if (lowerCheck) {
            return sb.toString().toLowerCase();
        }
        return sb.toString();

    }

    public static void sendMail(String email, String key) throws MessagingException {

        StringBuilder stringBuilder = new StringBuilder();

        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("noreply@bowmew.co.kr");
            messageHelper.setTo(email);
            messageHelper.setSubject("[멍냥커넥트]에서 도착한 이메일입니다.");
            URL url = new URL("http://j4b106.p.ssafy.io/api/users/shelters/authentication/" + key + "/" + email);
            String content = stringBuilder.append("하단의 링크로 접속하여 인증해주세요.")
                    .append("\n")
                    .append(url)
                    .toString();
            messageHelper.setText(content, true);
        };
        javaMailSender.send(messagePreparator);

    }


}
