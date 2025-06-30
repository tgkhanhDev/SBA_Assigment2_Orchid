package com.sba301.assignment2.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "orchids")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orchid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orchidId;

    @Column(name = "is_natural")
    private Boolean isNatural;
    @Column(name = "orchid_description")
    private String orchidDescription;
    @Column(name = "orchid_name")
    private String orchidName;
    @Column(name = "orchid_url")
    private String orchidUrl;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "orchid")
    private List<OrderDetail> orderDetails;
}
