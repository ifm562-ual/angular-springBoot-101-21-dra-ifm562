package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@Configuration
public class WebConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        System.out.println("Applying CORS config for Spring Data REST");
        cors.addMapping("/**")
                .allowedOriginPatterns("http://localhost:[*]", "http://127.0.0.1:[*]", "http://localhost")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                System.out.println("Applying CORS config for Spring MVC");
                registry.addMapping("/**")
                        .allowedOriginPatterns("http://localhost:[*]", "http://127.0.0.1:[*]", "http://localhost")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
