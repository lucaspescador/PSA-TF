package com.psa.matriculas2022.dtos;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class StudentStat {
    @NonNull
    private double rendimento;

    @NonNull
    private double creditos;
}



