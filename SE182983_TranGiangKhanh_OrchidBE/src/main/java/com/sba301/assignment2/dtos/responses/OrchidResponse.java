package com.sba301.assignment2.dtos.responses;

import com.sba301.assignment2.models.Orchid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrchidResponse {
    private Long orchidID;
    private Boolean isNatural;
    private String orchidDescription;
    private String orchidName;
    private String orchidUrl;
    private Double price;
    private CategoryResponse category;

    public static OrchidResponse of(Orchid orchid){
        return OrchidResponse.builder()
                .orchidID(orchid.getOrchidId())
                .isNatural(orchid.getIsNatural())
                .orchidDescription(orchid.getOrchidDescription())
                .orchidName(orchid.getOrchidName())
                .orchidUrl(orchid.getOrchidUrl())
                .price(orchid.getPrice())
                .category(CategoryResponse.of(orchid.getCategory()))
                .build();
    }
}