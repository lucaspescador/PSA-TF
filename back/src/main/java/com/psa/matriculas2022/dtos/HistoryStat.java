package com.psa.matriculas2022.dtos;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class HistoryStat {
    @NonNull
    private double rendimento;
}


