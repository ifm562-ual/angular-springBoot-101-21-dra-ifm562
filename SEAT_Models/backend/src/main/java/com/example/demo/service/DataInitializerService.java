package com.example.demo.service;

import com.example.demo.entity.Car;
import com.example.demo.repository.CarRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.example.demo.DemoApplication;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Configuration
public class DataInitializerService {

    @Bean
    ApplicationRunner init(CarRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                ObjectMapper mapper = new ObjectMapper();
                TypeReference<List<Map<String, String>>> typeReference = new TypeReference<List<Map<String, String>>>() {
                };
                try (InputStream inputStream = DemoApplication.class.getResourceAsStream("/static/models.json")) {
                    List<Map<String, String>> cars = mapper.readValue(inputStream, typeReference);
                    for (Map<String, String> carData : cars) {
                        Car car = new Car();
                        car.setName(carData.get("title"));
                        car.setUrl(carData.get("url"));
                        repository.save(car);
                    }
                    System.out.println("Cars saved from models.json!");
                } catch (Exception e) {
                    System.err.println("Unable to save cars: " + e.getMessage());
                }
            }
        };
    }

}
