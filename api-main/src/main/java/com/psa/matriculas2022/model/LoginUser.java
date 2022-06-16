package com.psa.matriculas2022.model;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class LoginUser {
    @NonNull
    private String username;

    @NonNull
    private String password;

}
