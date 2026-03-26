package com.example.demo;

import com.example.demo.entity.Car;
import com.example.demo.repository.CarRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Spring Boot Application Started");
	}

}
