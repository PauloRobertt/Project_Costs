package br.com.costs.Costs.DTO;

import java.util.List;

public record ProjetoDTO(Long id, String nome, float orcamento, String categoria, float TotalUtilizado, List<ServicoDTO> servicos) {}
