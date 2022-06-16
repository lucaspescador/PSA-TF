package com.psa.matriculas2022.model;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class AuthToken {
    @NonNull
    private String token;

    @NonNull
    private String username;

}
