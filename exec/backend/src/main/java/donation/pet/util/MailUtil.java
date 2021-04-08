package donation.pet.util;

import donation.pet.common.AppProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class MailUtil {

    private final JavaMailSender javaMailSender;
    private final AppProperties appProperties;

    public MailUtil(JavaMailSender javaMailSender, AppProperties appProperties) {
        this.javaMailSender = javaMailSender;
        this.appProperties = appProperties;
    }

    public String makeToken() {

        Random ran = new Random();
        StringBuilder sb = new StringBuilder();

        do {
            int num = ran.nextInt(75) + 48;
            if ((num >= 48 && num <= 57)
                    || (num >= 65 && num <= 90)
                    || (num >= 97 && num <= 122)) {
                sb.append((char) num);
            }
        } while (sb.length() < 30);

        return sb.toString();
    }

    public String sendAuthenticateEmail(String email) {
        // 메일 보내기
        StringBuilder mailContent = new StringBuilder();
        String token = makeToken();

        MimeMessagePreparator messagePreparer = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("noreply@bowmew.co.kr");
            messageHelper.setTo(email);
            messageHelper.setSubject("[멍냥이빌리지] 가입을 환영합니다. ");
            String content = mailContent
                    .append("<h2>이용하시려면 이메일 인증이 필요합니다. 하단의 링크로 접속하여 인증해주세요.</h2>")
                    .append("<a href='")
                    .append(appProperties.getServerUrl())
                    .append("/api/members/auth/")
                    .append(token)
                    .append("'>인증하기</a>")
                    .toString();
            messageHelper.setText(content, true);
        };

        javaMailSender.send(messagePreparer);

        return token;
    }

    public String sendChangePassword(String email) {
        // 메일 보내기
        StringBuilder mailContent = new StringBuilder();
        String token = makeToken();

        MimeMessagePreparator messagePreparer = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("noreply@bowmew.co.kr");
            messageHelper.setTo(email);
            messageHelper.setSubject("[멍냥이빌리지] 비밀번호 변경 ");
            String content = mailContent
                    .append("<h2>아래 링크를 따라가면 비밀번호를 변경할 수 있습니다.(비밀번호 재설정 요청은 24시간동안 유효합니다.)</h2>")
                    .append("<a href='")
                    .append(appProperties.getServerUrl())
                    .append("/api/members/password/")
                    .append(token)
                    .append("'>변경하기</a>")
                    .toString();
            messageHelper.setText(content, true);
        };

        javaMailSender.send(messagePreparer);

        return token;
    }
}