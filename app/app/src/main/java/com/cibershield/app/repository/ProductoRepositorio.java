package com.cibershield.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cibershield.app.model.Producto;

public interface ProductoRepositorio extends JpaRepository<Producto, Long> {

}
