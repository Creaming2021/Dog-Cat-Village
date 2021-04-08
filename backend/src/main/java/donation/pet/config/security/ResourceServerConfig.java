package donation.pet.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.resourceId("ssafy");
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
//                .cors().configurationSource(corsConfigurationSource())
//                .and()
                .csrf().disable()
                .anonymous()
                    .and()
                .authorizeRequests()

                    .antMatchers("/members/auth/**", "/members/password/**", "/members/duplication",
                            "/members/forget", "/members/login", "/members/signup")
                        .permitAll()

                    .mvcMatchers(HttpMethod.GET, "/pets/**", "/shelters/**")
                        .hasAnyAuthority("ROLE_CONSUMER", "ROLE_SHELTER")
                    .antMatchers("/consumers/**")
                        .hasAnyAuthority("ROLE_CONSUMER")


                    .antMatchers("/exchange/shelter/**", "/pet/**", "/shelters/**")
                        .hasAnyAuthority("ROLE_SHELTER")

                    .antMatchers("/exchange/admin/**")
                        .hasAnyAuthority("ROLE_ADMIN")

                // "/blockchain/**", "/chats/**", "/kakao-pay/**", "/adopts/**"
                    .anyRequest()
                        .authenticated()
                    .and()

                .exceptionHandling()
                .accessDeniedHandler(new OAuth2AccessDeniedHandler());

//                .authorizeRequests()
//                    // 아무나 접근 가능한 링크
//                    .antMatchers("/users/signup", "/users/login", "/users/check").permitAll()
//                    // 나머지
//                    .anyRequest().authenticated()
//                    .and()
//                .formLogin()
//                    .permitAll()
//                    .and()
//                .exceptionHandling()
//                    .accessDeniedHandler(new OAuth2AccessDeniedHandler())
//                    .and()
//                .csrf().disable();

//                .anonymous()
//                    .and()
//                .authorizeRequests()
//                    .mvcMatchers(HttpMethod.GET, "/api/**")
//                        .anonymous()
//                    .anyRequest()
//                        .authenticated()
//                    .and()
//                .exceptionHandling()
//                    .accessDeniedHandler(new OAuth2AccessDeniedHandler());

    }

    // CORS 허용 적용
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
