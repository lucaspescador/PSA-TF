package com.psa.matriculas2022.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "disciplinas")
public class Disciplina {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    @Column(unique = true)
    private String codigo;

    @NonNull
    private String nome;

    @NonNull
    private Integer creditos;

    @OneToMany(mappedBy = "disciplina")
    @JsonBackReference
    private List<Turma> turmas;

    @CreatedDate
    private LocalDateTime criado_em;

    @LastModifiedDate
    private LocalDateTime atualizado_em;
}